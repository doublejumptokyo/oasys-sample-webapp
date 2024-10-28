'use server';

import dynamic from 'next/dynamic';

import { SupportedSwitcher } from '@/components/SupportedSwitcher';
import { SupportedMethods } from '@/components/SupportedMethods';
import { UnsupportedMethods } from '@/components/UnsupportedMethods';

import { Connect } from '../components/Connect';

const Providers = dynamic(() => import('./providers'), { ssr: false });

export default async function Page() {
  return (
    <Providers>
      <div className="p-5 flex flex-col justify-center items-center">
        <h1 className="text-xl font-extrabold text-center">
          Oasys Passport Sample Page
        </h1>
        <div className="flex flex-col justify-center items-center">
          <Connect />
          <SupportedSwitcher>
            <SupportedMethods />
            <UnsupportedMethods />
          </SupportedSwitcher>
        </div>
      </div>
    </Providers>
  );
}
