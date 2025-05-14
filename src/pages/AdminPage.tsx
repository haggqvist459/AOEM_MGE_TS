import { useState } from "react";
import { deleteData, exportLocalStorageToFile, importLocalStorageFromFile, DAY_KEYS, SCORE_KEYS } from '@/utils'
import { SectionContainer, SectionHeader, Header, Modal } from "@/components";

const AdminPage = () => {

  const [showModal, setShowModal] = useState(false);

  const handleInputButtonClick = (inputId: string): void => {
    const input = document.getElementById(inputId);
    if (input) input.click();
  };

  const handleExports = (): void => {
    exportLocalStorageToFile(Object.values(DAY_KEYS), 'AoEM_MGE_Backup_Calc.txt')
    exportLocalStorageToFile(Object.values(SCORE_KEYS), 'AOEM_MGE_Backup_Prev.txt')
  }

  const confirmDelete = (): void => {
    deleteData()
    // setShowModal(false);
    window.location.reload();
  };


  return (
    <SectionContainer>
      <div key={'admin'}>
        <SectionHeader title="Data Management" showTrash={false} />
        <div className='flex flex-col md:flex-row space-x-5 justify-center text-center'>
          {/* Export */}
          <div className='w-full  md:w-1/3 flex flex-col items-center mb-5 pb-3 border-b border-secondary md:border-none'>
            <Header title="Export data" />
            <p className='flex-grow'>To transfer all the data from one device to another, export it into a .txt file first. </p>
            <button
              type="button"
              className="w-1/2 mt-4 border-2 border-primary bg-primary rounded text-blue-50 font-medium hover:border-blue-50"
              onClick={() => handleExports()}
            >
              Export
            </button>
          </div>
          {/* Import */}
          <div className='w-full md:w-1/3 flex flex-col items-center mb-5 pb-3 border-b border-secondary md:border-none'>
            <Header title="Import data" />
            <p className='flex-grow'>If you have a .txt file exported from this page, from another device, import it here.</p>
            <input
              id='inputButton'
              type='file'
              accept='.txt'
              style={{ display: 'none' }}
              onChange={(e) => importLocalStorageFromFile(e)}
            />
            <button
              type="button"
              id='inputButton'
              className="w-1/2 mt-4 border-2 border-primary bg-primary rounded text-blue-50 font-medium hover:border-blue-50"
              onClick={() => handleInputButtonClick('inputButton')}
            >
              Import
            </button>
          </div>
        </div>
        {/* Delete stuff */}
        <div className='w-full md:w-1/3 mx-auto text-center'>
          <div className='flex flex-col items-center border-b border-secondary md:border-none mb-5 pb-3'>
            <Header title="Delete data" />
            <p>Delete all calculator and previous event score data.</p>
            <button
              type="button"
              className="w-1/2 mt-4 border-2 border-primary bg-primary rounded text-blue-50 font-medium hover:border-blue-50"
              onClick={() => setShowModal(true)}
            >
              Delete
            </button>
          </div>
        </div>
        <Modal
          title="Delete data"
          description="Clear out all data stored locally? This action can not be undone."
          isOpen={showModal}
          onCancel={() => setShowModal(false)}
          onConfirm={() => confirmDelete()}
        />
      </div>
    </SectionContainer>
  )
}

export default AdminPage;