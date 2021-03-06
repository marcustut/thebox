import { Icon } from '@iconify/react'
import Dayjs from 'dayjs'
import RelativeTime from 'dayjs/plugin/relativeTime'
import React, { useEffect, useState } from 'react'
import { useEffectOnce } from 'react-use'

import { LoadingPage } from '@/components/Misc'
import { MissionOneDialog, MissionTwoDialog, useFetchEscape, useUpsertEscape } from '@/features/escape'
import { MissionLayout } from '@/features/mission'
import { useAuth } from '@/lib/auth'

Dayjs.extend(RelativeTime)

export const Escape: React.FC = () => {
  const { user } = useAuth()
  const [mounted, setMounted] = useState<boolean>(false)
  const [missionOneDialog, setMissionOneDialog] = useState<boolean>(false)
  const [missionTwoDialog, setMissionTwoDialog] = useState<boolean>(false)
  const { escape, fetchEscape } = useFetchEscape()
  const { upsertEscape } = useUpsertEscape()

  useEffect(() => {
    if (!user || !user.user.team) return
    fetchEscape(user.user.team.id)
      .then(() => console.log('fetched escape'))
      .catch(err => {
        if (err.message === 'ErrNotFound') {
          upsertEscape({ teamId: user.user.team!.id }).then(() => {
            console.log('upserted escape')
            fetchEscape(user.user.team!.id).then(() => console.log('fetched escape'))
          })
        }
      })
  }, [fetchEscape, upsertEscape, user])

  useEffectOnce(() => setMounted(true))

  if (!mounted) return <LoadingPage />

  if (!user || !escape || !escape.data.escape) return <LoadingPage />

  return (
    <>
      <MissionLayout isHall utilities={{ p: 'px-4 pt-4 pb-20', pos: 'relative' }}>
        <div className='flex flex-col <sm:items-center <sm:text-center'>
          <h2 className='font-bold text-2xl'>Welcome to the Hub!</h2>
          <p className='text-sm text-true-gray-400'>Scan the following QR Code to enter our virtual Escape Room</p>
          <img
            data-blobity-magnetic='false'
            data-blobity-tooltip='Click me!'
            src='https://vfqzgsbgmlvglbygosna.supabase.in/storage/v1/object/public/assets/ArtstepQR.png'
            alt="Artsteps' QR Code"
            className='mt-4 w-64 h-64 cursor-pointer'
            onClick={() => window.open('https://www.artsteps.com/view/61696cc9eee9bb3128d828c7')}
          />
          <p className='mt-4 text-sm text-true-gray-400'>
            In order to escape, you must complete the three tasks below:{' '}
          </p>

          <div className='mt-0 p-4 rounded-lg flex flex-col w-full'>
            <button
              data-blobity-magnetic='false'
              data-blobity-tooltip={escape.data.escape.missionOne ? 'This mission is completed' : undefined}
              disabled={escape.data.escape.missionOne}
              className={`${
                escape.data.escape.missionOne ? 'bg-dark-50' : 'bg-dark-300'
              } w-full rounded-lg p-4 relative`}
              onClick={() => setMissionOneDialog(true)}
            >
              <span
                className={`${
                  escape.data.escape.missionOne ? 'bg-primary' : 'bg-secondary'
                } absolute -top-2 right-4 rounded-full px-2 py-1 text-xs font-medium`}
              >
                {escape.data.escape.missionOne ? 'Completed' : 'Uncompleted'}
              </span>
              <span>Mission 1</span>
            </button>
            <button
              data-blobity-magnetic='false'
              data-blobity-tooltip={escape.data.escape.missionTwo ? 'This mission is completed' : undefined}
              disabled={escape.data.escape.missionTwo}
              className={`${
                escape.data.escape.missionTwo ? 'bg-dark-50' : 'bg-dark-300'
              } mt-6 w-full rounded-lg p-4 relative`}
              onClick={() => setMissionTwoDialog(true)}
            >
              <span
                className={`${
                  escape.data.escape.missionTwo ? 'bg-primary' : 'bg-secondary'
                } absolute -top-2 right-4 rounded-full px-2 py-1 text-xs font-medium`}
              >
                {escape.data.escape.missionTwo ? 'Completed' : 'Uncompleted'}
              </span>
              <span>Mission 2</span>
            </button>
            <button
              data-blobity-magnetic='false'
              data-blobity-tooltip={escape.data.escape.missionThree ? 'This mission is completed' : undefined}
              className={`${
                escape.data.escape.missionThree > 0 ? 'bg-dark-50' : 'bg-dark-300'
              } mt-6 w-full rounded-lg p-4 relative`}
              onClick={() => (window.location.href = `${window.location.pathname}/mystery`)}
            >
              <span
                className={`${
                  escape.data.escape.missionThree > 0 ? 'bg-primary' : 'bg-secondary'
                } absolute -top-2 right-4 rounded-full px-2 py-1 text-xs font-medium`}
              >
                {escape.data.escape.missionThree > 0 ? 'Completed' : 'Uncompleted'}
              </span>
              <span>
                Mission 3{escape.data.escape.missionThree > 0 ? ` (${escape.data.escape.missionThree} marks)` : ''}
              </span>
            </button>
          </div>
          <span className='text-sm text-true-gray-400 flex items-center'>
            <Icon icon='ph:lightbulb-filament-fill' className='mr-1' /> For mission 3, you can keep trying until you get
            the highest marks.
          </span>
        </div>
      </MissionLayout>

      <MissionOneDialog open={missionOneDialog} onClose={() => setMissionOneDialog(false)} />
      <MissionTwoDialog open={missionTwoDialog} onClose={() => setMissionTwoDialog(false)} />
    </>
  )
}
