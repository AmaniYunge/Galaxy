<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Answer extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'answers';

    /**
    Relationship
     */

    public function assessment()
    {
        return $this->hasOne('App\Assessment','assessment_id','id');
    }


}
