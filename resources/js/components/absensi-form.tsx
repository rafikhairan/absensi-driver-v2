import LaporanDialog from '@/components/laporan-dialog';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CalendarIcon, Check } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import InputError from '@/components/input-error';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useForm, usePage } from '@inertiajs/react';
import { SharedData } from '@/types';
import { FormEventHandler, useState } from 'react';

type AbsensiForm = {
  shift: string;
  driver_pengganti?: string;
  tanggal: string;
  jam_mulai: string;
  jam_selesai: string;
  km_awal?: number;
  km_akhir?: number;
  uraian_perjalanan: string;
  km_bensin?: number;
  liter?: number;
  biaya_bensin?: number;
  bukti_bensin?: File;
  biaya_tol?: number;
  bukti_tol?: File;
  biaya_parkir?: number;
  bukti_parkir?: File;
  biaya_lain_lain?: number;
  bukti_lain_lain?: File
}

export default function AbsensiForm() {
  const { flash } = usePage<SharedData>().props
  const { data, setData, post, processing, errors, reset } = useForm<AbsensiForm>()

  const [biayaChecked, setBiayaChecked] = useState<boolean>(false)
  const [driverChecked, setDriverChecked] = useState<boolean>(false)

  const submit: FormEventHandler = (e) => {
    e.preventDefault()

    post(route("absensi.store"), {
      onSuccess: () => reset()
    })
  }

  return (
    <form onSubmit={submit}>
      <div className="border-b pb-8">
        <div className="flex items-center justify-between pb-8">
          <div>
            <h2 className="text-2xl font-bold">Form Absensi</h2>
            <p className="mt-1 text-sm text-muted-foreground">Silakan isi data kehadiran anda dengan benar.</p>
          </div>
          <LaporanDialog />
        </div>
        {flash.success && (
          <Alert variant="green" className="mb-8">
            <Check className="h-4 w-4" />
            <AlertTitle>Absen Berhasil!</AlertTitle>
            <AlertDescription>
              {flash.success}
            </AlertDescription>
          </Alert>
        )}

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="grid gap-2">
            <Label htmlFor="tanggal">Tanggal</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !data.tanggal && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon />
                  {data.tanggal ? format(data.tanggal, "dd/MM/yyyy") : <span>Pilih tanggal</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={data.tanggal ? new Date(data.tanggal) : undefined}
                  onSelect={(value) => value && setData("tanggal", format(value, 'yyyy-MM-dd'))}
                />
              </PopoverContent>
            </Popover>
            <InputError message={errors.tanggal} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="shift">Shift</Label>
            <Select defaultValue={data.shift} onValueChange={(value) => setData("shift", value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih shift" />
              </SelectTrigger>
              <SelectContent>
                {["Cipto", "Kus", "Manto", "Feby", "Bambang"].map((shift) => (
                  <SelectItem value={shift}>{shift}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <InputError message={errors.shift} />
          </div>
          <div className="col-span-full grid lg:grid-cols-2 items-center gap-6">
            <div className="flex items-center space-x-2">
              <Checkbox id="driver-pengganti" checked={driverChecked} onCheckedChange={() => setDriverChecked(!driverChecked)} />
              <Label
                htmlFor="driver-pengganti"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Anda driver pengganti?
              </Label>
            </div>
            {driverChecked && (
              <div className="grid gap-2">
                <Label htmlFor="driver_pengganti">Nama Driver Pengganti</Label>
                <Input
                  id="driver_pengganti"
                  type="text"
                  required
                  value={data.driver_pengganti}
                  onChange={(e) => setData("driver_pengganti", e.target.value)}
                  placeholder="Input nama driver pengganti"
                />
                <InputError message={errors.driver_pengganti} />
              </div>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="jam_mulai">Jam Mulai</Label>
            <Input
              id="jam_mulai"
              type="time"
              required
              value={data.jam_mulai}
              onChange={(e) => setData("jam_mulai", e.target.value)}
              placeholder="Input jam mulai"
            />
            <InputError message={errors.jam_mulai} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="jam_selesai">Jam Selesai</Label>
            <Input
              id="jam_selesai"
              type="time"
              required
              value={data.jam_selesai}
              onChange={(e) => setData("jam_selesai", e.target.value)}
              placeholder="Input jam selesai"
            />
            <InputError message={errors.jam_selesai} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="km_awal">Kilometer Awal</Label>
            <Input
              id="km_awal"
              type="number"
              required
              value={data.km_awal ?? ""}
              onChange={(e) => setData("km_awal", Number(e.target.value))}
              placeholder="Input kilometer awal"
            />
            <InputError message={errors.km_awal} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="km_akhir">Kilometer Akhir</Label>
            <Input
              id="km_akhir"
              type="number"
              required
              value={data.km_akhir ?? ""}
              onChange={(e) => setData("km_akhir", Number(e.target.value))}
              placeholder="Input kilometer akhir"
            />
            <InputError message={errors.km_akhir} />
          </div>
          <div className="grid gap-2 col-span-full">
            <Label htmlFor="uraian_perjalanan">Uraian Perjalanan</Label>
            <Textarea
              id="uraian_perjalanan"
              required
              value={data.uraian_perjalanan}
              onChange={(e) => setData("uraian_perjalanan", e.target.value)}
              placeholder="Input uraian perjalanan"
            />
            <InputError message={errors.uraian_perjalanan} />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="tambahan" checked={biayaChecked} onCheckedChange={() => setBiayaChecked(!biayaChecked)} />
            <Label
              htmlFor="tambahan"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Ada biaya tambahan?
            </Label>
          </div>
          {biayaChecked && (
            <>
              <div className="col-span-full grid grid-cols-3 gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="km_bensin">Kilometer</Label>
                  <Input
                    id="km_bensin"
                    type="number"
                    value={data.km_bensin ?? ""}
                    onChange={(e) => setData("km_bensin", Number(e.target.value))}
                    placeholder="Input kilometer"
                  />
                  <InputError message={errors.km_bensin} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="liter">Liter</Label>
                  <Input
                    id="liter"
                    type="number"
                    value={data.liter ?? ""}
                    onChange={(e) => setData("liter", Number(e.target.value))}
                    placeholder="Input liter"
                  />
                  <InputError message={errors.liter} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="biaya_bensin">Biaya Bensin</Label>
                  <Input
                    id="biaya_bensin"
                    type="number"
                    value={data.biaya_bensin ?? ""}
                    onChange={(e) => setData("biaya_bensin", Number(e.target.value))}
                    placeholder="Input biaya bensin"
                  />
                  <InputError message={errors.biaya_bensin} />
                </div>
              </div>
              <div className="grid gap-2 col-span-full">
                <Label htmlFor="bukti_bensin">Bukti Foto</Label>
                <Input
                  id="bukti_bensin"
                  type="file"
                  onChange={(e) => setData("bukti_bensin", e.target.files?.[0])}
                />
                <InputError message={errors.bukti_bensin} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="biaya_tol">Biaya Tol</Label>
                <Input
                  id="biaya_tol"
                  type="number"
                  value={data.biaya_tol ?? ""}
                  onChange={(e) => setData("biaya_tol", Number(e.target.value))}
                  placeholder="Input biaya tol"
                />
                <InputError message={errors.biaya_tol} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="bukti_tol">Bukti Foto</Label>
                <Input
                  id="bukti_tol"
                  type="file"
                  onChange={(e) => setData("bukti_tol", e.target.files?.[0])}
                />
                <InputError message={errors.bukti_tol} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="biaya_parkir">Biaya Parkir</Label>
                <Input
                  id="biaya_parkir"
                  type="number"
                  value={data.biaya_parkir ?? ""}
                  onChange={(e) => setData("biaya_parkir", Number(e.target.value))}
                  placeholder="Input biaya parkir"
                />
                <InputError message={errors.biaya_parkir} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="bukti_parkir">Bukti Foto</Label>
                <Input
                  id="bukti_parkir"
                  type="file"
                  onChange={(e) => setData("bukti_parkir", e.target.files?.[0])}
                />
                <InputError message={errors.bukti_parkir} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="biaya_lain_lain">Biaya Tol</Label>
                <Input
                  id="biaya_lain_lain"
                  type="number"
                  value={data.biaya_lain_lain ?? ""}
                  onChange={(e) => setData("biaya_lain_lain", Number(e.target.value))}
                  placeholder="Input biaya lain lain"
                />
                <InputError message={errors.biaya_lain_lain} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="bukti_tol">Bukti Foto</Label>
                <Input
                  id="bukti_lain_lain"
                  type="file"
                  onChange={(e) => setData("bukti_lain_lain", e.target.files?.[0])}
                />
                <InputError message={errors.bukti_lain_lain} />
              </div>
            </>
          )}
        </div>
      </div>
      <div className="grid mt-8">
        <Button disabled={processing}>Simpan</Button>
      </div>
    </form>
  )
}
