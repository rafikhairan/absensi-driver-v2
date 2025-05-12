<?php

namespace App\Http\Controllers;

use App\Http\Requests\AbsensiRequest;
use App\Models\Absensi;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class AbsensiController extends Controller
{
  public function index(): InertiaResponse
  {
    return Inertia::render('welcome');
  }

  public function store(AbsensiRequest $request): RedirectResponse
  {
    Absensi::create($request->validated());

    return redirect()->route('absensi.index')->with('success', 'Data kehadiranmu telah tercatat. Terima kasih sudah absen hari ini 🎉');
  }

  public function rekap(Request $request): Response
  {
    $tanggal = $request->query('tanggal');
    $shift = $request->query('shift');

    $absensi = Absensi::when($tanggal, function (Builder $query) use ($tanggal) {
      if (!empty($tanggal['from']) && !empty($tanggal['to'])) {
        $query->whereBetween('tanggal', [$tanggal['from'], $tanggal['to']]);
      } elseif (!empty($tanggal['from'])) {
        $query->where('tanggal', '>=', $tanggal['from']);
      } elseif (!empty($tanggal['to'])) {
        $query->where('tanggal', '<=', $tanggal['to']);
      }
    })->when($shift, function (Builder $query) use ($shift) {
      $query->where('shift', $shift);
    })
      ->get();

    return Pdf::loadView('pdf.rekap-absensi', [
      'title' => 'Rekap Absensi',
      'tanggal' => $tanggal,
      'data' => $absensi
    ])
      ->setPaper('a4', 'landscape')
      ->download('Rekap Absensi.pdf');
  }
}
