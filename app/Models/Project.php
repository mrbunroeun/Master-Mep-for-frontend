<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
    'title', 'category', 'description', 'scope',
    'location', 'timeline', 'video_url',
    'image', 'is_active',
];
}
