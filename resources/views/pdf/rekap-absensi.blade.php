@use(App\Models\Evidence)

@extends('pdf.layout')

@push('styles')
    <style>
        .container {
            width: 100%;
            overflow: hidden;
        }

        h1 {
            font-weight: bold;
            font-size: 1.125rem; /* text-lg */
            margin-bottom: 1.25rem; /* mb-5 */
        }

        table {
            width: 100%;
            border-collapse: collapse;
            border: 1px solid black;
        }

        thead {
            background-color: #DBEAFE; /* bg-blue-100 */
        }

        th, td {
            border: 1px solid #E5E7EB; /* border-gray-200 */
            padding: 0.375rem 0.5rem; /* px-2 py-1.5 (1.5 = 6px) */
        }

        th {
            text-align: center;
            font-weight: 600;
        }

        td.text-center {
            text-align: center;
        }

        td.text-left {
            text-align: left;
        }

        td.text-right {
            text-align: right;
        }

        td.px-4 {
            padding-left: 1rem;
            padding-right: 1rem;
        }

        td.py-2 {
            padding-top: 0.5rem;
            padding-bottom: 0.5rem;
        }
    </style>
@endpush

@section('content')
    <div class="container">
        <h1>Rekap Absensi</h1>
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
                    <td class="text-center px-4 py-2">{{ $row->tanggal }}</td>
                    <td class="text-center px-4 py-2">{{ $row->nama }}</td>
                    <td class="text-center px-4 py-2">{{ $row->jam_mulai }}</td>
                    <td class="text-center px-4 py-2">{{ $row->jam_selesai }}</td>
                    <td class="text-center px-4 py-2">{{ $row->km_awal }}</td>
                    <td class="text-center px-4 py-2">{{ $row->km_akhir }}</td>
                    <td class="text-center px-4 py-2">{{ $row->uraian_perjalanan }}</td>
                </tr>
            @endforeach
            </tbody>
        </table>
    </div>
@endsection
