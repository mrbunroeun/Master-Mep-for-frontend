<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MaintenanceContract extends Model
{
    protected $fillable = ['title', 'subtitle', 'description', 'points', 'image', 'is_active'];

    protected $casts = ['is_active' => 'boolean'];
}