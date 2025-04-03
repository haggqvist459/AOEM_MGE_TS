import { useState } from 'react'
import { calculateDailyScoreDayFour, updateFieldDayFour, resetStateDayFour } from "@/redux";
import { useDailyCalculator } from "@/hooks";
import { CalculatorContainer, CalculatorHeader, SubHeader, RowWrapper, Input, Output, Modal, InfoButton, TimeSelector } from "@/components";

type Props = {}


const DayFourCalc = (props: Props) => {

  const {
    localState,
    handleLocalChange,
    handleBlur,
    reset,
  } = useDailyCalculator({
    selector: state => state.dayFour,
    updateField: updateFieldDayFour,
    calculateScore: (field) => calculateDailyScoreDayFour(field),
    resetState: resetStateDayFour,
  })

  const [showModal, setShowModal] = useState(false)


  const resetCalculator = () => {
    reset()
    setShowModal(false);
  }


  return (
    <CalculatorContainer>
      <CalculatorHeader title="Day Four" handleClick={() => setShowModal(true)} />
      <div className='flex flex-col md:flex-row'>
        <div className='calculator-input'>
          <div className='flex space-x-1'>
            <SubHeader title='Ring upgrades' />
            <InfoButton message='Ring materials are consumed in batches based on individual ring levels. These scores are rough estimates' />
          </div>
          <RowWrapper>
            <Input
              id='hammers'
              label='Hammers'
              placeholder='0'
              value={localState.hammers}
              onChange={(e) => handleLocalChange('hammers', e.target.value)}
              onBlur={() => handleBlur('hammers')}
            />
            <Input
              id='fineGold'
              label='Fine gold'
              placeholder='0'
              value={localState.fineGold}
              onChange={(e) => handleLocalChange('fineGold', e.target.value)}
              onBlur={() => handleBlur('fineGold')}
            />
          </RowWrapper>
          <RowWrapper>
            <Input
              id='silverSand'
              label='Silver sand'
              placeholder='0'
              value={localState.silverSand}
              onChange={(e) => handleLocalChange('silverSand', e.target.value)}
              onBlur={() => handleBlur('silverSand')}
            />
            <Input
              id='copperSand'
              label='Copper sand'
              placeholder='0'
              value={localState.copperSand}
              onChange={(e) => handleLocalChange('copperSand', e.target.value)}
              onBlur={() => handleBlur('copperSand')}
            />
          </RowWrapper>
          <SubHeader title='Speed-ups' />
          <TimeSelector
            title='Universal'
            timeValue={localState.universalSpeedup}
            field='universalSpeedup'
            onChange={handleLocalChange}
            onBlur={handleBlur}
          />
          <TimeSelector
            title='Building'
            timeValue={localState.buildingSpeedup}
            field='buildingSpeedup'
            onChange={handleLocalChange}
            onBlur={handleBlur}
          />
          <TimeSelector
            title='Research'
            timeValue={localState.researchSpeedup}
            field='researchSpeedup'
            onChange={handleLocalChange}
            onBlur={handleBlur}
          />
          <SubHeader title='Previous Event Score' />
          <RowWrapper>
            <Input
              id='previous.first'
              label='First'
              placeholder='0'
              value={localState.previousEvent.first}
              onChange={(e) => handleLocalChange('previousEvent', e.target.value, 'first')}
              onBlur={() => handleBlur('previousEvent', 'first')}
            />
            <Input
              id='previous.tenth'
              label='Tenth'
              placeholder='0'
              value={localState.previousEvent.tenth}
              onChange={(e) => handleLocalChange('previousEvent', e.target.value, 'tenth')}
              onBlur={() => handleBlur('previousEvent', 'tenth')}
            />
          </RowWrapper>
        </div>
        <div className='calculator-output'>
          <SubHeader title="Score" />
          <RowWrapper>
            <Output label="Total daily score: " value={localState.totalDailyScore} />
            <Output label='Ring upgrades' value={localState.score.rings} />
          </RowWrapper>
          <SubHeader title='Speed-up score' />
          <RowWrapper>
            <Output label='Universal' value={localState.score.universal} />
            <Output label='Building' value={localState.score.building} />
            <Output label='Research' value={localState.score.research} />
          </RowWrapper>
          <SubHeader title='Previous Event Score' />
          <RowWrapper>
            <Output label='First' value={localState.previousEvent.first} />
            <Output label='Tenth' value={localState.previousEvent.tenth} />
          </RowWrapper>
        </div>
      </div>
      <Modal
        isOpen={showModal}
        title="Reset Calculator"
        description="Reset all values back to 0? This action can not be undone."
        onCancel={() => setShowModal(false)}
        onConfirm={resetCalculator} />
    </CalculatorContainer>
  )
}

export default DayFourCalc;