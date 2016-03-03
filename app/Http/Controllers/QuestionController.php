<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Question;

use DB;
class QuestionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * load  questions by assessment/interview.
     *
     * @return \Illuminate\Http\Response
     */
    public function loadByAssessment($id)
    {
        $questions = DB::table('questions')->where('assessment_id','=',$id)->get();

        return $questions;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $question = new Question();
        $question->description       = $request->description;
        $question->assessment_id     = $request->assessment_id;
        $question->question_number   = $request->question_number;
        $question->score_for_yes     = $request->score_for_yes;
        $question->score_for_no      = $request->score_for_no;

        if(!$question->save()){
            return "failed";
        }else{
            return "success";
        }
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
        $question = Question::find($id);
        $question->description       = $request->description;
        $question->assessment_id     = $request->assessment_id;
        $question->question_number   = $request->question_number;
        $question->score_for_yes     = $request->score_for_yes;
        $question->score_for_no      = $request->score_for_no;

        if(!$question->save()){
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
        //
    }
}
