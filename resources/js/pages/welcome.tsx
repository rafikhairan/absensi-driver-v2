import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import InputError from '@/components/input-error';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { FormEventHandler, useState } from 'react';
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DateRange } from 'react-day-picker';

type AbsensiForm = {
  nama: string;
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

export default function Welcome() {
  const { data, setData, post, processing, errors, reset } = useForm<AbsensiForm>()

  const [checked, setChecked] = useState<boolean>(false)
  const [date, setDate] = useState<DateRange | undefined>()

  const submit: FormEventHandler = (e) => {
    e.preventDefault()

    post(route("absensi.store"), {
      onSuccess: () => reset()
    })
  }

  return (
    <>
      <Head title="Form" />
      <div className="max-w-4xl mx-auto p-8 space-y-8">
        <form onSubmit={submit}>
          <div className="border-b pb-8">
            <div className="flex items-center justify-between pb-8">
              <div>
                <h2 className="text-2xl font-bold">Form Absensi</h2>
                <p className="mt-1 text-sm text-muted-foreground">Silakan isi data kehadiran anda dengan benar.</p>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Rekap</Button>
                </DialogTrigger>
                <DialogContent
                  className="sm:max-w-[425px]"
                  onInteractOutside={(e) => e.preventDefault()}
                >
                  <DialogHeader>
                    <DialogTitle>Rekap Absensi</DialogTitle>
                    <DialogDescription>
                      Pilih rentang tanggal untuk melihat rekap absensi.
                    </DialogDescription>
                  </DialogHeader>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon />
                        {date?.from ? (
                          date.to ? (
                            <>
                              {format(date.from, "dd/MM/yyyy")} -{" "}
                              {format(date.to, "dd/MM/yyyy")}
                            </>
                          ) : (
                            format(date.from, "dd/MM/yyyy")
                          )
                        ) : (
                          <span>Pilih tanggal</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={2}
                      />
                    </PopoverContent>
                  </Popover>
                  <DialogFooter>
                    <Button asChild>
                      <Link
                        href={
                          date?.from && date?.to
                            ? `/rekap?tanggal[from]=${format(date.from, "yyyy-MM-dd")}&tanggal[to]=${format(date.to, "yyyy-MM-dd")}`
                            : `/rekap`
                        }
                      >
                        Download
                      </Link>
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

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
                <Label htmlFor="nama">Nama</Label>
                <Select defaultValue={data.nama} onValueChange={(value) => setData("nama", value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih nama" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
                <InputError message={errors.nama} />
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
                <Label htmlFor="jam_selesai">Jam Mulai</Label>
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
                <Checkbox id="tambahan" checked={checked} onCheckedChange={() => setChecked(!checked)} />
                <Label
                  htmlFor="tambahan"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Ada biaya tambahan?
                </Label>
              </div>
              {checked && (
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
      </div>
    </>
  )
}
