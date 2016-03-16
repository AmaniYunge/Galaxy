<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Applicant extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'applicants';

    /**
     * Relationships
     */

    public function applications()
    {
        return $this->hasOne('App\Application','applicant_id','id');
    }

    public function grantedloans()
    {
        return $this->hasMany('App\GrantedLoan','applicant_id','id');
    }

    public function applicantsponsor()
    {
        return $this->hasOne('App\Applicantsponsor','applicant_id','id');
    }



    public function loan_returns()
    {
        return $this->hasMany('App\LoanReturn','applicant_id','id');
    }
}
