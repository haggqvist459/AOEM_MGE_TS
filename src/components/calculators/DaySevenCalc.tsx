import { useState } from 'react'
import { useDailyCalculator } from '@/hooks'
import { DaySevenStateData, updateFieldDaySeven, resetStateDaySeven, calculateDailyScoreDaySeven } from '@/redux'
import { toNumber, TRIBE_LEVEL_MULTIPLIERS, TROOP_POWER_MULTIPLIER } from '@/utils'
import { CalculatorHeader, CalculatorContainer, RowWrapper, SubHeader, InfoButton, Input, Output, Modal, ExpandableSection } from '@/components'
import { Dropdown, mapToDropdownOptions } from '@/components/ui/dropdown'

const tribeDropdownOptions = mapToDropdownOptions(TRIBE_LEVEL_MULTIPLIERS);
const troopTierDropdownOptions = mapToDropdownOptions(TROOP_POWER_MULTIPLIER);

type Props = {}

const DaySevenCalc = (props: Props) => {

  const {
    localState,
    handleLocalChange,
    handleBlur,
    reset,
    handleInstantDispatch
  } = useDailyCalculator<DaySevenStateData>({
    selector: state => state.daySeven,
    updateField: updateFieldDaySeven,
    calculateScore: (field) => calculateDailyScoreDaySeven(field),
    resetState: resetStateDaySeven,
    useInstantDispatch: true
  })

  const [expandedSection, setExpandedSection] = useState({
    tribe: false,
    medals: true,
    rings: true,
    powerGain: true,
  })
  const [showModal, setShowModal] = useState(false)
  const toggleSection = (section: keyof typeof expandedSection) => {
    setExpandedSection(prev => ({ ...prev, [section]: !prev[section] }));
  }

  const resetCalculator = () => {
    reset()
    setShowModal(false);
  }

  return (
    <CalculatorContainer>
      <CalculatorHeader title='Day Seven' handleClick={() => setShowModal(prev => !prev)} />
      <div className='flex flex-col md:flex-row'>
        <div className='calculator-input'>
          <ExpandableSection title='Tribe Hunting' isExpanded={expandedSection.tribe} toggleExpansion={() => toggleSection('tribe')}>
            <RowWrapper>
              <Input
                id='stamina'
                label='Stamina'
                placeholder='0'
                value={localState.stamina}
                onChange={(e) => handleLocalChange('stamina', e.target.value)}
                onBlur={() => handleBlur('stamina')}
              />
              <Dropdown
                id='tribeLevelMultiplier'
                label='Tribe level'
                options={tribeDropdownOptions}
                value={localState.tribeLevelMultiplier}
                onChange={(e) => handleInstantDispatch('tribeLevelMultiplier', e.target.value)}
              />
            </RowWrapper>
          </ExpandableSection>
          <ExpandableSection title='Medals & Scrolls' isExpanded={expandedSection.medals} toggleExpansion={() => toggleSection('medals')}>
            <span className='text-base font-semibold text-primary'>Medals</span>
            <RowWrapper>
              <Input
                id='legendaryMedals'
                label='Legendary'
                placeholder='0'
                value={localState.legendaryMedals}
                onChange={(e) => handleLocalChange('legendaryMedals', e.target.value)}
                onBlur={() => handleBlur('legendaryMedals')}
              />
              <Input
                id='epicMedals'
                label='Epic'
                placeholder='0'
                value={localState.epicMedals}
                onChange={(e) => handleLocalChange('epicMedals', e.target.value)}
                onBlur={() => handleBlur('epicMedals')}
              />
            </RowWrapper>
            <span className='text-base font-semibold text-primary'>Scrolls</span>
            <RowWrapper>
              <Input
                id='legendaryScrolls'
                label='Legendary'
                placeholder='0'
                value={localState.legendaryScrolls}
                onChange={(e) => handleLocalChange('legendaryScrolls', e.target.value)}
                onBlur={() => handleBlur('legendaryScrolls')}
              />
              <Input
                id='epicScrolls'
                label='Epic'
                placeholder='0'
                value={localState.epicScrolls}
                onChange={(e) => handleLocalChange('epicScrolls', e.target.value)}
                onBlur={() => handleBlur('epicScrolls')}
              />
            </RowWrapper>
          </ExpandableSection>
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
          <SubHeader title='Previous Event Score' />
          <RowWrapper>
            <Output label='First' value={toNumber(localState.previousEvent.first)} />
            <Output label='Tenth' value={toNumber(localState.previousEvent.tenth)} />
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

export default DaySevenCalc;