import { Head } from '@inertiajs/react';
import AbsensiForm from '@/components/absensi-form';

export default function Welcome() {
  return (
    <>
      <Head title="Form" />
      <div className="max-w-4xl mx-auto p-8 space-y-8">
        <AbsensiForm />
      </div>
    </>
  )
}
