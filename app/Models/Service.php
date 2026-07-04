<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    protected $fillable = [
        'type', 'tagline', 'title', 'description', 'image',
        'button_text', 'button_link',
        'benefits_title', 'benefits_points',
        'items', 'order', 'is_active',
    ];

    protected $casts = [
        'items'     => 'array',
        'is_active' => 'boolean',
        'order'     => 'integer',
    ];
}