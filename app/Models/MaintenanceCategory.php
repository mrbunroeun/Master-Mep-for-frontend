<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MaintenanceCategory extends Model
{
    protected $fillable = ['title', 'image', 'points', 'sort_order', 'is_active'];

    protected $casts = ['is_active' => 'boolean'];
}