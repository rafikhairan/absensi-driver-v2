<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Http\Testing\File;

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

        $isDriverPengganti = fake()->boolean();

        return [
            'shift' => fake()->randomElement(["Cipto", "Kus", "Manto", "Feby", "Bambang"]),
            'driver_pengganti' => $isDriverPengganti ? fake()->name() : null,
            'tanggal' => fake()->date(),
            'jam_mulai' => fake()->time('H:i'),
            'jam_selesai' => fake()->time('H:i'),
            'km_awal' => $kmAwal,
            'km_akhir' => $kmAkhir,
            'uraian_perjalanan' => fake()->word(),

            'km_bensin' => fake()->optional()->numberBetween(0, 100),
            'liter' => fake()->optional()->numberBetween(1, 20),
            'biaya_bensin' => fake()->optional()->numberBetween(10000, 200000),
            'bukti_bensin' => File::fake()->image('test.jpg'),

            'biaya_tol' => fake()->optional()->numberBetween(5000, 100000),
            'bukti_tol' => File::fake()->image('test.jpg'),

            'biaya_parkir' => fake()->optional()->numberBetween(2000, 50000),
            'bukti_parkir' => File::fake()->image('test.jpg'),

            'biaya_lain_lain' => fake()->optional()->numberBetween(1000, 100000),
            'bukti_lain_lain' => File::fake()->image('test.jpg')
        ];
    }
}
