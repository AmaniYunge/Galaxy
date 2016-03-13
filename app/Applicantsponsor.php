<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Applicantsponsor extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'applicant_sponsors';

    /**
    Relationship
     */


    public function sponsor()
    {
        return $this->hasOne('App\Sponsor','id','sponsor_id');
    }



}
