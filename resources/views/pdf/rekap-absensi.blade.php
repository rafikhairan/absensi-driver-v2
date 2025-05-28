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
      font-size: 11px;
    }

    th, td {
      border: 1px solid black;
      padding: 4px;
      text-align: center;
    }

    th {
      background-color: #f0f0f0;
    }
  </style>
@endpush

@section('content')
  <div class="header">
    <h1>Laporan Absensi</h1>
    @if($tanggal)
      <p>{{ $tanggal['from'] }} - {{ $tanggal['to'] }}</p>
    @endif
    @if($shift)
      <p>{{ $shift }}</p>
    @endif
  </div>
  <table>
    <thead>
    <tr>
      <th rowspan="2">Tanggal</th>
      @if(!$shift)
        <th rowspan="2">Shift</th>
      @endif
      <th rowspan="2">Driver</th>
      <th rowspan="2">Jam</th>
      <th colspan="3">Perjalanan</th>
      <th colspan="3">Bensin</th>
      <th rowspan="2">Tol</th>
      <th rowspan="2">Parkir</th>
      <th rowspan="2">Lain-lain</th>
    </tr>
    <tr>
      <th>Km Awal</th>
      <th>Uraian</th>
      <th>Km Akhir</th>
      <th>Km</th>
      <th>Lt</th>
      <th>Total</th>
    </tr>
    </thead>
    <tbody>
    @foreach($data as $row)
      <tr>
        <td>{{ Carbon::parse($row->tanggal)->format('d/m/Y') }}</td>
        @if(!$shift)
          <td>{{ $row->shift }}</td>
        @endif
        <td>{{ $row->driver_pengganti ?? $row->shift }}</td>
        <td>{{ Carbon::parse($row->jam_mulai)->format('H:i') }} - {{ Carbon::parse($row->jam_selesai)->format('H:i') }}</td>
        <td>{{ $row->km_awal }}</td>
        <td>{{ $row->uraian_perjalanan }}</td>
        <td>{{ $row->km_akhir }}</td>
        <td>{{ $row->km_bensin }}</td>
        <td>{{ $row->liter }}</td>
        <td>
          @if($row->biaya_bensin)
            @rupiah($row->biaya_bensin)
          @endif
        </td>
        <td>
          @if($row->biaya_tol)
            @rupiah($row->biaya_tol)
          @endif
        </td>
        <td>
          @if($row->biaya_parkir)
            @rupiah($row->biaya_parkir)
          @endif
        </td>
        <td>
          @if($row->biaya_lain_lain)
            @rupiah($row->biaya_lain_lain)
          @endif
        </td>
      </tr>
    @endforeach
    </tbody>
    <tfoot>
    <tr>
      @php
        $total = $data->sum('biaya_bensin') + $data->sum('biaya_tol') + $data->sum('biaya_parkir') + $data->sum('biaya_lain_lain');
      @endphp
      <td colspan="{{ !$shift ? '9' : '8' }}" style="text-align: center;"><strong>Jumlah</strong></td>
      <td colspan="4"><strong>@rupiah($total)</strong></td>
    </tr>
    </tfoot>
  </table>

  <div style="page-break-after: always;"></div>
  <div class="header">
    <h1>Lampiran Foto</h1>
  </div>

  <div style="text-align: center;">
    @foreach($data as $i => $row)
      <div style="width: 24%; float: left; margin: 0.5%; text-align: center;">
        <img src="{{ storage_path('app/public/' . $row->bukti_bensin) }}" alt="Bukti Bensin"
             style="width: 100%; height: auto; max-height: 300px; object-fit: contain;">
        <p style="font-size: 12px; margin-top: 5px;">
          {{ Carbon::parse($row->tanggal)->format('d/m/Y') }}_{{ $row->shift }}_{{ $row->km_awal }}_Bensin
        </p>
      </div>
      <div style="width: 24%; float: left; margin: 0.5%; text-align: center;">
        <img src="{{ storage_path('app/public/' . $row->bukti_tol) }}" alt="Bukti Tol"
             style="width: 100%; height: auto; max-height: 300px; object-fit: contain;">
        <p style="font-size: 12px; margin-top: 5px;">
          {{ Carbon::parse($row->tanggal)->format('d/m/Y') }}_{{ $row->shift }}_Tol
        </p>
      </div>
      <div style="width: 24%; float: left; margin: 0.5%; text-align: center;">
        <img src="{{ storage_path('app/public/' . $row->bukti_parkir) }}" alt="Bukti Parkir"
             style="width: 100%; height: auto; max-height: 300px; object-fit: contain;">
        <p style="font-size: 12px; margin-top: 5px;">
          {{ Carbon::parse($row->tanggal)->format('d/m/Y') }}_{{ $row->shift }}_Parkir
        </p>
      </div>
      <div style="width: 24%; float: left; margin: 0.5%; text-align: center;">
        <img src="{{ storage_path('app/public/' . $row->bukti_lain_lain) }}" alt="Bukti Tol"
             style="width: 100%; height: auto; max-height: 300px; object-fit: contain;">
        <p style="font-size: 12px; margin-top: 5px;">
          {{ Carbon::parse($row->tanggal)->format('d/m/Y') }}_{{ $row->shift }}_Lain-lain
        </p>
      </div>
      <div style="clear: both;"></div>
    @endforeach
    <div style="clear: both;"></div>
  </div>
@endsection
