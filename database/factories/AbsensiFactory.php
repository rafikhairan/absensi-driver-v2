<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Absensi>
 */
class AbsensiFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $kmAwal = fake()->numberBetween(10000, 20000);
        $kmAkhir = $kmAwal + fake()->numberBetween(10, 100);

        return [
            'nama' => fake()->name,
            'tanggal' => fake()->date(),
            'jam_mulai' => fake()->time('H:i'),
            'jam_selesai' => fake()->time('H:i'),
            'km_awal' => $kmAwal,
            'km_akhir' => $kmAkhir,
            'uraian_perjalanan' => fake()->paragraph(),

            'km_bensin' => fake()->optional()->numberBetween(0, 100),
            'liter' => fake()->optional()->numberBetween(1, 20),
            'biaya_bensin' => fake()->optional()->numberBetween(10000, 200000),
            'bukti_bensin' => fake()->optional()->imageUrl(),

            'biaya_tol' => fake()->optional()->numberBetween(5000, 100000),
            'bukti_tol' => fake()->optional()->imageUrl(),

            'biaya_parkir' => fake()->optional()->numberBetween(2000, 50000),
            'bukti_parkir' => fake()->optional()->imageUrl(),

            'biaya_lain_lain' => fake()->optional()->numberBetween(1000, 100000),
            'bukti_lain_lain' => fake()->optional()->imageUrl(),
        ];
    }
}
