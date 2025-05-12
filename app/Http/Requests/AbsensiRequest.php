<?php

namespace App\Http\Requests;

use Carbon\Carbon;
use Illuminate\Foundation\Http\FormRequest;

class AbsensiRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'shift' => ['required', 'string', 'max:255'],
            'driver_pengganti' => ['nullable', 'string', 'max:255'],
            'tanggal' => ['required', 'date', 'date_format:Y-m-d'],
            'jam_mulai' => ['required', 'date_format:H:i'],
            'jam_selesai' => ['required', 'date_format:H:i'],
            'km_awal' => ['required', 'integer', 'min:0'],
            'km_akhir' => ['required', 'integer', 'min:0', 'gte:km_awal'],
            'uraian_perjalanan' => ['required', 'string'],

            'km_bensin' => ['nullable', 'integer', 'min:0'],
            'liter' => ['nullable', 'integer', 'min:0'],
            'biaya_bensin' => ['nullable', 'integer', 'min:0'],
            'bukti_bensin' => ['nullable', 'file', 'mimes:jpg,jpeg,png,pdf', 'max:2048'],

            'biaya_tol' => ['nullable', 'integer', 'min:0'],
            'bukti_tol' => ['nullable', 'file', 'mimes:jpg,jpeg,png,pdf', 'max:2048'],

            'biaya_parkir' => ['nullable', 'integer', 'min:0'],
            'bukti_parkir' => ['nullable', 'file', 'mimes:jpg,jpeg,png,pdf', 'max:2048'],

            'biaya_lain_lain' => ['nullable', 'integer', 'min:0'],
            'bukti_lain_lain' => ['nullable', 'file', 'mimes:jpg,jpeg,png,pdf', 'max:2048'],
        ];
    }

    protected function prepareForValidation()
    {
      $this->merge([
        'tanggal' => Carbon::parse($this->tanggal)->format('Y-m-d')
      ]);
    }
}
