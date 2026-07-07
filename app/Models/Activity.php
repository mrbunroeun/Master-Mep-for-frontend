<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Activity extends Model
{
    protected $fillable = [
        'title',
        'category',
        'activity_date',
        'excerpt',
        'image',
        'is_active',
    ];

    protected $casts = [
        'activity_date' => 'date',
        'is_active'     => 'boolean',
    ];
}