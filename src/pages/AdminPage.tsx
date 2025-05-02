import { useState } from "react";
import { deleteData, exportLocalStorageToFile, importLocalStorageFromFile } from '@/utils'
import { CalculatorContainer, CalculatorHeader, Header, Modal } from "@/components";

const AdminPage = () => {

  const [showModal, setShowModal] = useState(false);

  const handleInputButtonClick = (): void => {
    const input = document.getElementById('inputBackup');
    if (input) input.click();
  };

  const confirmDelete = (): void => {
    deleteData()
    // setShowModal(false);
    window.location.reload();
  };


  return (
    <CalculatorContainer>
      <CalculatorHeader title="Data Management" showTrash={false} />
      <div className='flex flex-col md:flex-row space-x-5 justify-center text-center'>
        {/* Export */}
        <div className='w-full  md:w-1/3 flex flex-col items-center mb-5 pb-3 border-b border-secondary md:border-none'>
          <Header title="Export data" />
          <p className='flex-grow'>To transfer all the data from one device to another, export it into a .txt file first. </p>
          <button
            type='button'
            className='w-1/2 mt-4 border-2 border-secondary bg-secondary rounded text-primary font-bold hover:border-primary hover:bg-neutral-500 '
            onClick={() => exportLocalStorageToFile()}
          >
            Export
          </button>
        </div>
        {/* Import */}
        <div className='w-full md:w-1/3 flex flex-col items-center mb-5 pb-3 border-b border-secondary md:border-none'>
          <Header title="Import data" />
          <p className='flex-grow'>If you have a .txt file exported from this page, from another device, import it here.</p>
          <input
            id='inputBackup'
            type='file'
            accept='.txt'
            style={{ display: 'none' }}
            onChange={(e) => importLocalStorageFromFile(e)}
          />
          <button
            id='inputBackup'
            type='button'
            className='w-1/2 mt-4 border-2 border-secondary bg-secondary rounded text-primary font-bold hover:border-primary hover:bg-neutral-500'
            onClick={handleInputButtonClick}>Import</button>
        </div>
      </div>
      {/* Delete stuff */}
      <div className='w-full md:w-1/3 mx-auto text-center'>
        <div className='flex flex-col items-center border-b border-secondary md:border-none mb-5 pb-3'>
          <Header title="Delete data" />
          <p>Delete all calculator and previous event score data.</p>
          <button
            type='button'
            className='w-1/2 mt-4 border-2 border-secondary bg-secondary rounded text-primary font-bold hover:border-primary hover:bg-neutral-500'
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
    </CalculatorContainer>
  )
}

export default AdminPage;