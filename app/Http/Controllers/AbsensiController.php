<?php

namespace App\Http\Controllers;

use App\Http\Requests\AbsensiRequest;
use App\Models\Absensi;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class AbsensiController extends Controller
{
  public function index(): Response
  {
    return Inertia::render('welcome');
  }

  public function store(AbsensiRequest $request): RedirectResponse
  {
    Absensi::create($request->validated());

    return redirect()->route('absensi.index');
  }
}
