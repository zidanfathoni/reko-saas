

import Headers2 from '@/components/atoms/headers2';
import { TabDemo } from './circle-navigation';



export function ZidanfathModules() {

  return (
    <div className='min-h-screen'>
      <div className='pt-10'>
        <div className='container'>
          <Headers2
            title='Reach Us'
            subtitle='Speak with Our Friendly Team'
            description="We'd love to assist you. Fill out the form or drop us an email."
          />
        </div>
        <div className="block items-center justify-items-center">
          <TabDemo />
        </div>
      </div>
    </div>
  )
}