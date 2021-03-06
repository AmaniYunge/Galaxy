<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Loan;
use Illuminate\Support\Facades\Auth;

class LoanController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $loans = Loan::all()->load("applications","applications.applicants","applications.sponsor");

        return $loans;
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $loan = new Loan();

        $loan->name = $request->name;
        $loan->code = $request->code;
        $loan->principle_amount = $request->principle_amount;
        $loan->loan_duration = $request->loan_duration;
        $loan->repayment_period = $request->repayment_period;
        $loan->interest_rate = $request->interest_rate;
        $loan->created_by = 1;

        if(!$loan->save()){
            return "failed";
        }else{
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
        $loan = Loan::find($id);

        $loan->name = $request->name;
        $loan->code = $request->code;
        $loan->principle_amount = $request->principle_amount;
        $loan->loan_duration = $request->loan_duration;
        $loan->repayment_period = $request->repayment_period;
        $loan->interest_rate = $request->interest_rate;
        $loan->created_by = 1;

        if(!$loan->save()){
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
        $loan = new Loan();

        if($loan->destroy($id)){
            return "success";
        }
    }
}
