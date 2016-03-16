<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Application extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'applications';

    /**
        Relations
     */
    public function applicants()
    {
        return $this->hasOne('App\Applicant','id','applicant_id');
    }

    public function sponsor()
    {
        return $this->hasOne('App\Sponsor','id','sponsor_id');
    }

    public function loan()
    {
        return $this->belongsTo('App\Loan','loan_id','id');
    }



}
