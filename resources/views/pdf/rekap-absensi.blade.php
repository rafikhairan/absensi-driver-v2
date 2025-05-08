@use(Carbon\Carbon)

@extends('pdf.layout')

@push('styles')
  <style>
    body {
      font-family: Arial, sans-serif;
      font-size: 14px;
    }

    .header {
      margin-bottom: 20px;
    }

    .header h1 {
      font-weight: bold;
      font-size: 18px;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 14px;
    }

    th, td {
      border: 1px solid #000;
      padding: 3px;
      text-align: center;
    }
  </style>
@endpush

@section('content')
  <div class="header">
    <h1>Laporan Absensi</h1>
    @if($tanggal)
      <p>{{ $tanggal['from'] }} - {{ $tanggal['to'] }}</p>
    @endif
  </div>
  <table>
    <thead>
    <tr>
      <th>Tanggal</th>
      <th>Nama</th>
      <th>Jam Mulai</th>
      <th>Jam Selesai</th>
      <th>KM Awal</th>
      <th>KM Akhir</th>
      <th>Uraian Perjalanan</th>
    </tr>
    </thead>
    <tbody>
    @foreach($data as $row)
      <tr>
        <td class="text-center px-4 py-2">{{ Carbon::parse($row->tanggal)->format('d/m/Y') }}</td>
        <td class="text-center px-4 py-2">{{ $row->nama }}</td>
        <td class="text-center px-4 py-2">{{ Carbon::parse($row->jam_mulai)->format('H:i') }}</td>
        <td class="text-center px-4 py-2">{{ Carbon::parse($row->jam_selesai)->format('H:i') }}</td>
        <td class="text-center px-4 py-2">{{ $row->km_awal }}</td>
        <td class="text-center px-4 py-2">{{ $row->km_akhir }}</td>
        <td class="text-center px-4 py-2">{{ $row->uraian_perjalanan }}</td>
      </tr>
    @endforeach
    </tbody>
  </table>

  <div style="page-break-after: always;"></div>
  <div class="header">
    <h1>Lampiran Foto</h1>
  </div>

  <div style="text-align: center;">
    @foreach($data as $i => $row)
      <div style="width: 24%; float: left; margin: 0.5%; text-align: center;">
        <img src="{{ public_path('storage/' . $row->bukti_bensin) }}" alt="Bukti Bensin"
             style="width: 100%; height: auto; max-height: 300px; object-fit: contain;">
        <p style="font-size: 12px; margin-top: 5px;">
          {{ Carbon::parse($row->tanggal)->format('d/m/Y') }}_{{ $row->nama }}_Bensin
        </p>
      </div>
      <div style="width: 24%; float: left; margin: 0.5%; text-align: center;">
        <img src="{{ public_path('storage/' . $row->bukti_tol) }}" alt="Bukti Tol"
             style="width: 100%; height: auto; max-height: 300px; object-fit: contain;">
        <p style="font-size: 12px; margin-top: 5px;">
          {{ Carbon::parse($row->tanggal)->format('d/m/Y') }}_{{ $row->nama }}_Tol
        </p>
      </div>
      <div style="width: 24%; float: left; margin: 0.5%; text-align: center;">
        <img src="{{ public_path('storage/' . $row->bukti_parkir) }}" alt="Bukti Parkir"
             style="width: 100%; height: auto; max-height: 300px; object-fit: contain;">
        <p style="font-size: 12px; margin-top: 5px;">
          {{ Carbon::parse($row->tanggal)->format('d/m/Y') }}_{{ $row->nama }}_Parkir
        </p>
      </div>
      <div style="width: 24%; float: left; margin: 0.5%; text-align: center;">
        <img src="{{ public_path('storage/' . $row->bukti_lain_lain) }}" alt="Bukti Tol"
             style="width: 100%; height: auto; max-height: 300px; object-fit: contain;">
        <p style="font-size: 12px; margin-top: 5px;">
          {{ Carbon::parse($row->tanggal)->format('d/m/Y') }}_{{ $row->nama }}_Lain-lain
        </p>
      </div>
      <div style="clear: both;"></div>
    @endforeach
    <div style="clear: both;"></div>
  </div>
@endsection
