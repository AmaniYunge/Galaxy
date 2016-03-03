<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'questions';

    /**
    Relationship
     */

    public function assessment()
    {
        return $this->hasOne('App\Assessment','assessment_id','id');
    }

}
