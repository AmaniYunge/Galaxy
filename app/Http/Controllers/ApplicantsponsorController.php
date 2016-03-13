<?php

namespace App\Http\Controllers;

use App\Applicantsponsor;
use App\Sponsor;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class ApplicantsponsorController extends Controller
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
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

      $applicantSponsor = new Applicantsponsor();
      $sponsor = new Sponsor();

        if($request->type=="individual"){

            $sponsor->first_name     = $request->first_name;
            $sponsor->middle_name    = $request->middle_name;
            $sponsor->last_name      = $request->last_name;
            $sponsor->gender         = $request->gender;
            $sponsor->phone          = $request->phone;
            $sponsor->postal_address = $request->postal_address;
            $sponsor->residence      = $request->residence;
            $sponsor->occupation     = $request->occupation;


            if(!$sponsor->save()){
                return "failed";
            }else{

                $applicantSponsor->sponsor_type  = $request->type;
                $applicantSponsor->sponsor_id    = $sponsor->id;
                $applicantSponsor->applicant_id  = $request->applicantid;
                if(!$applicantSponsor->save()){
                    return "failed";
                }else{
                    return "success";
                }

            }


        }

        if($request->type=="group"){
            $applicantSponsor->sponsor_type  = $request->type;
            $applicantSponsor->sponsor_id    = $request->id;
            $applicantSponsor->applicant_id  = $request->applicantid;

            if(!$applicantSponsor->save()){
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
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
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
        //
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
