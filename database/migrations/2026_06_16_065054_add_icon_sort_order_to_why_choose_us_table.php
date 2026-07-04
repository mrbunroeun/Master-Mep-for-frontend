<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::table('why_choose_us', function (Blueprint $table) {
            $table->string('section_label')->nullable()->after('main_description');
            $table->string('section_title')->nullable()->after('section_label');
        });
    }
    public function down(): void {
        Schema::table('why_choose_us', function (Blueprint $table) {
            $table->dropColumn(['section_label', 'section_title']);
        });
    }
};