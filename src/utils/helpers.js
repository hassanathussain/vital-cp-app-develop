// < ------------------------------- ConfirmModal ------------------------------ >

export const toggleEditModal = (
  e,
  id,
  modalControlCallback,
  trackCancelCallback,
) => {
  e.preventDefault()
  modalControlCallback(true)

  if (trackCancelCallback) {
    trackCancelCallback(id)
  } else {
    console.log(id)
  }
}

export const Title = (type) => {
    if (type === 'cancel') {
      return 'Confirm Cancelation'
    } else if (type === 'newProvider') {
      return 'Request New Interpreter(s)'
    } else {
      return 'Confirm '
    }
  },
  Message = (type) => {
    if (type === 'cancel') {
      return 'Are you sure you want to cancel this request? All details will be removed and you will need to submit a new request'
    } else if (type === 'newProvider') {
      return 'The assigned interpreter(s) will be unassigned and the request will be offered to others. Sorenson can not guarantee that your request will be filled.'
    } else {
      return 'Confirm '
    }
  }

export const getTemplate = (type, viewMode) => {
  switch (type) {
    case 'cancel':
      return {
        title: 'Cancel Request?',
        description:
          'Are you sure you want to cancel this request? This action cannot be undone.',
        confirmTitle: 'Confirm',
        cancelTitle: 'Go Back',
      }
    case 'unsaved':
      return {
        title: 'Unsaved Changes',
        description: `Your changes to the ${
          viewMode === 'series' ? 'series' : 'event'
        } will be lost if you navigate away. Are you sure you want leave?`,
        confirmTitle: 'Leave',
        cancelTitle: 'Return',
      }
    default:
      return {
        title: 'Cancel?',
        description:
          'Are you sure you want to cancel this? This action cannot be undone.',
        confirmTitle: 'Confirm',
        cancelTitle: 'Cancel',
      }
  }
}
