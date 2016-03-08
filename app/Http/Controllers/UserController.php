<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\User;
class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = User::all();
        return $users;
    }



    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user = new User();

        $user->first_name       = $request->first_name;
        $user->middle_name      = $request->middle_name;
        $user->last_name        = $request->last_name;
        $user->gender           = $request->gender;
        $user->birth_date       = $request->birth_date;
        $user->phone            = $request->phone;
        $user->postal_address   = $request->postal_address;
//        $user->role             = $request->role;
        $user->role             = 'ADMIN';
//        $user->status           = $request->status;
        $user->status           = 'ACTIVE';
        $user->email            = $request->email;
        $user->password         = $request->password;

        if(!$user->save()){
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
        if(!strpos($id,"@")){
            $users = User::find($id);
            return $users[0];
        }else{
            $users = User::all()->where('email',$id);
            return $users[0];
        }

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
        $users = User::find($id);

        if(!$users->delete()){
            return "failed";
        }else{
            return "success";
        }
    }
}
