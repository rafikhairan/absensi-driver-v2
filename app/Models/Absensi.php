<?php

namespace App\Models;

use App\Traits\HasFile;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Absensi extends Model
{
  use HasFactory, HasFile;

  protected $table = 'absensi';
  protected $fillable = [
    'tanggal',
    'nama',
    'jam_mulai',
    'jam_selesai',
    'km_awal',
    'km_akhir',
    'uraian_perjalanan',
    'km_bensin',
    'liter',
    'biaya_bensin',
    'bukti_bensin',
    'biaya_tol',
    'bukti_tol',
    'biaya_parkir',
    'bukti_parkir',
    'biaya_lain_lain',
    'bukti_lain_lain',
  ];
  protected array $fileAttributes = [
    'bukti_bensin' => 'uploads/bukti_bensin',
    'bukti_tol' => 'uploads/bukti_tol',
    'bukti_parkir' => 'uploads/bukti_parkir',
    'bukti_lain_lain' => 'uploads/bukti_lain_lain'
  ];
}
