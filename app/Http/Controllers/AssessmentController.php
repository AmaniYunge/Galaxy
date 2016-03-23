<?php

namespace App\Http\Controllers;

use App\Assessment;
use App\Applicantresponse;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use DB;
class AssessmentController extends Controller
{

    var $ids = 0;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $assessment = Assessment::all();
        return $assessment;
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $assessment = new Assessment();

        $assessment->assessment_name = $request->assessment_name;
        $assessment->loan_id = $request->loan_id;
        $assessment->minimum_score = $request->minimum_score;

        if(!$assessment->save()){
            return "failed";
        }else{
            // when assessment is sent successfully add
            return "success";
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $assessment = Assessment::find($id);

        return $assessment;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function question($id)
    {
        $assessment = Assessment::find($id)->load('questions');

        return $assessment;
    }


    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function response(Request $request, $id)
    {

        $checkExisteance = DB::table('applicantresponse')
                ->where('applicantresponse.applicant_id', '=', $request->applicant)
                ->where('assessment_id', '=', $request->assessment)
                ->where('question_id', '=', $request->question)->get();

        if($checkExisteance){
            $response = Applicantresponse::find($checkExisteance[0]->id);
            $response->applicant_id  = $request->applicant;
            $response->assessment_id = $request->assessment;
            $response->question_id   = $request->question;
            $response->answer        = $request->answer;
            $response->score         = $request->score;

            if(!$response->save()){
                return "failed";
            }else{
                return "success";
            }

        }else{
            $response = new Applicantresponse();
            $response->applicant_id  = $request->applicant;
            $response->assessment_id = $request->assessment;
            $response->question_id   = $request->question;
            $response->answer        = $request->answer;
            $response->score         = $request->score;

            if(!$response->save()){
                return "failed";
            }else{
                return "success";
            }


        }


    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function qestionresponse($id)
    {

        $responses = DB::table('applicantresponse') ->where('applicantresponse.applicant_id', '=', $id)->get();


        $response_array = array();
        $assess_array = array();
        $count = 0;

        $array_of_assessment = array();
        $number_of_assessment_taken = 0;
        foreach($responses as $single_response ) {
            if(in_array($single_response->assessment_id,$array_of_assessment)){
                $number_of_assessment_taken++;
            }else{
                array_push($array_of_assessment,$single_response->assessment_id);
            }
        }

        foreach($responses as $single_response ) {


            foreach($response_array as $index=>$arr){
                if(array_key_exists($single_response->assessment_id,$response_array[$index])){
                    $response_array[$index][$single_response->assessment_id]+=$single_response->score;
                }else{
                    if($count<$number_of_assessment_taken){
                        $assess_array = array($single_response->assessment_id=>$single_response->score);
                        $assess_array[$single_response->assessment_id]=$single_response->score;
                        array_push($response_array,$assess_array);
                    }

                }

            }

            if(array_key_exists($single_response->assessment_id,$assess_array)){
                $assess_array[$single_response->assessment_id]+=$single_response->score;
            }else{
                $assess_array = array($single_response->assessment_id=>$single_response->score);
                $assess_array[$single_response->assessment_id]=$single_response->score;
            }

            if($count==1){
                array_push($response_array,$assess_array);
            }

            $count++;
        }

        return json_encode($response_array);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function getQuestionresponse($applicantId,$assessment_id){

        $responses = DB::table('applicantresponse')
            ->where('applicantresponse.applicant_id', '=', $applicantId)
            ->where('assessment_id', '=', $assessment_id)
            ->get();

        return json_encode($responses);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $assessment =Assessment::find($id);

        $assessment->assessment_name = $request->assessment_name;
        $assessment->loan_id         = $request->loan_id;
        $assessment->minimum_score   = $request->minimum_score;

        if(!$assessment->save()){
            return "failed";
        }else{
            return "success";
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $assessment = Assessment::find($id);

        if(!$assessment->delete()){
            return "failed";
        }else{
            return "success";
        }

    }
}
