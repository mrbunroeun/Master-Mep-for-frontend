<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MaintenanceFeature extends Model
{
    protected $fillable = [
        'title',
        'image',
        'scope',
        'location',
        'timeline',
        'is_active',
    ];
}