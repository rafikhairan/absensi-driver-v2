import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';

export default function LaporanDialog() {
  const [date, setDate] = useState<DateRange | undefined>()
  const [shift, setShift] = useState<string | undefined>()

  const handleClick = () => {
    const params = new URLSearchParams()

    if (date?.from && date?.to) {
      params.append("tanggal[from]", format(date.from, "yyyy-MM-dd"))
      params.append("tanggal[to]", format(date.to, "yyyy-MM-dd"))
    }

    if (shift) {
      params.append("shift", shift)
    }

    const url = `/rekap${params.toString() ? `?${params.toString()}` : ''}`

    window.open(url, "_blank")
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Laporan</Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px]"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Rekap Absensi</DialogTitle>
          <DialogDescription>
            Filter berdasarkan tanggal dan/atau shift (opsional).
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-2">
          <Label htmlFor="shift">Shift</Label>
          <Select defaultValue={shift} onValueChange={(value) => setShift(value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Pilih shift" />
            </SelectTrigger>
            <SelectContent>
              {["Cipto", "Kus", "Manto", "Feby", "Bambang"].map((shift) => (
                <SelectItem value={shift}>{shift}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="tanggal">Tanggal</Label>
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
        </div>
        <DialogFooter>
          <Button onClick={handleClick}>
            Download
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
