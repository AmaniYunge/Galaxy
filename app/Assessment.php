<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Assessment extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'assessments';

    public function questions()
    {
        return $this->hasMany('App\Question','assessment_id','id');
    }

}
