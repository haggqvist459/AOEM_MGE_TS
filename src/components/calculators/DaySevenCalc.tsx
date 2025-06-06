import { useState, useEffect } from 'react'
import { useDailyCalculator, usePreviousEventScores } from '@/hooks';
import { DaySevenStateData, updateFieldDaySeven, resetStateDaySeven, calculateDailyScoreDaySeven } from '@/redux'
import { DAY_KEYS, TRIBE_LEVEL_MULTIPLIERS, TROOP_POWER_MULTIPLIER } from '@/utils'
import { DayKey } from '@/types'
import { SectionHeader, SectionContainer, CalculatorButtons, RowWrapper, Header, Input, Output, Modal, ExpandableSection, PreviousEventScore } from '@/components'
import { Dropdown, mapToDropdownOptions } from '@/components/ui/dropdown'

type Props = {
  activeDay: DayKey;
  setActiveDay: React.Dispatch<React.SetStateAction<DayKey>>;
}

const DaySevenCalc = ({ activeDay, setActiveDay }: Props) => {

  const {
    localState,
    handleLocalChange,
    handleBlur,
    reset,
    handleInstantDispatch
  } = useDailyCalculator<DaySevenStateData>({
    selector: state => state[DAY_KEYS.DAY_SEVEN],
    updateField: updateFieldDaySeven,
    calculateScore: (field) => calculateDailyScoreDaySeven(field),
    resetState: resetStateDaySeven,
    useInstantDispatch: true
  })

  const {
    eventList,
    selectedEvent,
    setSelectedEvent,
    selectedScore,
  } = usePreviousEventScores(DAY_KEYS.DAY_SEVEN)


  useEffect(() => {
    console.log('localState daySeven: ', localState)
  }, []);

  const [expandedSection, setExpandedSection] = useState({
    tribe: false,
    medals: false,
    rings: false,
    powerGain: false,
  })

  const [showModal, setShowModal] = useState(false)
  const tribeDropdownOptions = mapToDropdownOptions(TRIBE_LEVEL_MULTIPLIERS);
  const troopTierDropdownOptions = mapToDropdownOptions(TROOP_POWER_MULTIPLIER);
  const previousEventDropdownOptions = [
    { label: 'Daily average', value: 'daily-average' },
    ...mapToDropdownOptions(eventList)
  ]

  const toggleSection = (section: keyof typeof expandedSection) => {
    setExpandedSection(prev => ({ ...prev, [section]: !prev[section] }));
  }

  const resetCalculator = () => {
    reset()
    setShowModal(false);
  }

  return (
    <SectionContainer>
      <SectionHeader title='Day Seven' handleClick={() => setShowModal(prev => !prev)} />
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
            <RowWrapper>
              <Input
                id='legendaryMedals'
                label='Legendary medals'
                placeholder='0'
                value={localState.legendaryMedals}
                onChange={(e) => handleLocalChange('legendaryMedals', e.target.value)}
                onBlur={() => handleBlur('legendaryMedals')}
              />
              <Input
                id='epicMedals'
                label='Epic medals'
                placeholder='0'
                value={localState.epicMedals}
                onChange={(e) => handleLocalChange('epicMedals', e.target.value)}
                onBlur={() => handleBlur('epicMedals')}
              />
            </RowWrapper>
            <RowWrapper>
              <Input
                id='legendaryScrolls'
                label='Legendary scrolls'
                placeholder='0'
                value={localState.legendaryScrolls}
                onChange={(e) => handleLocalChange('legendaryScrolls', e.target.value)}
                onBlur={() => handleBlur('legendaryScrolls')}
              />
              <Input
                id='epicScrolls'
                label='Epic scrolls'
                placeholder='0'
                value={localState.epicScrolls}
                onChange={(e) => handleLocalChange('epicScrolls', e.target.value)}
                onBlur={() => handleBlur('epicScrolls')}
              />
            </RowWrapper>
          </ExpandableSection>
          <ExpandableSection title='Rings' isExpanded={expandedSection.rings} toggleExpansion={() => toggleSection('rings')}>
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
          </ExpandableSection>
          <ExpandableSection title='Power gain' isExpanded={expandedSection.powerGain} toggleExpansion={() => toggleSection('powerGain')}>
            <Input
              id='researchPower'
              placeholder='0'
              label='Research'
              value={localState.researchPower}
              onChange={(e) => handleLocalChange('researchPower', e.target.value)}
              onBlur={() => handleBlur('researchPower')}
            />
            <RowWrapper>
              <Input
                id='buildingPower.firstQueue'
                placeholder='0'
                label='Building'
                value={localState.buildingPower.firstQueue}
                onChange={(e) => handleLocalChange('buildingPower', e.target.value, 'firstQueue')}
                onBlur={() => handleBlur('buildingPower', 'firstQueue')}
              />
              <Input
                id='buildingPower.secondQueue'
                placeholder='0'
                label=''
                value={localState.buildingPower.secondQueue}
                onChange={(e) => handleLocalChange('buildingPower', e.target.value, 'secondQueue')}
                onBlur={() => handleBlur('buildingPower', 'secondQueue')}
              />
              <Input
                id='buildingPower.thirdQueue'
                placeholder='0'
                label=''
                value={localState.buildingPower.thirdQueue}
                onChange={(e) => handleLocalChange('buildingPower', e.target.value, 'thirdQueue')}
                onBlur={() => handleBlur('buildingPower', 'thirdQueue')}
              />
            </RowWrapper>
            <RowWrapper>
              <Input
                id='troopsTotal'
                placeholder='0'
                label='Troop total'
                value={localState.troopsTotal}
                onChange={(e) => handleLocalChange('troopsTotal', e.target.value)}
                onBlur={() => handleBlur('troopsTotal')}
              />
              <Dropdown
                label='Target tier'
                id='troopTier'
                options={troopTierDropdownOptions}
                value={localState.troopTier}
                onChange={(e) => handleInstantDispatch('troopTier', e.target.value)}
              />
            </RowWrapper>
          </ExpandableSection>
          <Dropdown
            id='previousEventDropdown'
            label='Previous event score'
            value={selectedEvent}
            options={previousEventDropdownOptions}
            onChange={(e) => setSelectedEvent(e.target.value)}
          />
        </div>
        <div className='calculator-output'>
          <Header title="Score" />
          <RowWrapper>
            <Output label="Total daily score" value={localState.totalDailyScore} />
            <Output label="Troops" value={localState.score.troops} />
          </RowWrapper>
          <RowWrapper>
            <Output label="Research" value={localState.score.research} />
            <Output label="Building" value={localState.score.building} />
          </RowWrapper>
          <RowWrapper>
            <Output label="Medals" value={localState.score.medals} />
            <Output label="Scrolls" value={localState.score.scrolls} />
          </RowWrapper>
          <RowWrapper>
            <Output label="Rings" value={localState.score.rings} />
            <Output label="Tribes" value={localState.score.tribes} />
          </RowWrapper>
          <PreviousEventScore score={selectedScore} />
        </div>
      </div>
      <CalculatorButtons activeDay={activeDay} setActiveDay={setActiveDay} />
      <Modal
        isOpen={showModal}
        title="Reset Calculator"
        description="Reset all values back to 0? This action can not be undone."
        onCancel={() => setShowModal(false)}
        onConfirm={resetCalculator} />
    </SectionContainer>
  )
}

export default DaySevenCalc;