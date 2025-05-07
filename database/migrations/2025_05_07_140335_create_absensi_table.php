<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('absensi', function (Blueprint $table) {
            $table->id();
            $table->date('tanggal');
            $table->string('nama');
            $table->time('jam_mulai');
            $table->time('jam_selesai');
            $table->integer('km_awal');
            $table->integer('km_akhir');
            $table->text('uraian_perjalanan');
            $table->integer('km_bensin')->nullable();
            $table->integer('liter')->nullable();
            $table->integer('biaya_bensin')->nullable();
            $table->text('bukti_bensin')->nullable();
            $table->integer('biaya_tol')->nullable();
            $table->text('bukti_tol')->nullable();
            $table->integer('biaya_parkir')->nullable();
            $table->text('bukti_parkir')->nullable();
            $table->integer('biaya_lain_lain')->nullable();
            $table->text('bukti_lain_lain')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('absensi');
    }
};
