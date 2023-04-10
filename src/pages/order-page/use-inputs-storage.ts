import { FocusEvent } from 'react'
import { useSessionStorage } from 'storage';


export const useInputsStorage = () => {

  const [inputFullName, setInputFullName] = useSessionStorage<string>({ key: 'fullName' })
  const [inputEmail, setInputEmail] = useSessionStorage<string>({ key: 'email' })
  const [inputPhone, setInputPhone] = useSessionStorage<string>({ key: 'phone' })
  const [inputAddress, setInputAddress] = useSessionStorage<string>({ key: 'address' })
  const [inputPromo, setInputPromo] = useSessionStorage<string>({ key: 'promo' })
  const [inputComment, setInputComment] = useSessionStorage<string>({ key: 'comment' })

  const setInputStorage = (event: FocusEvent<HTMLInputElement> | FocusEvent<HTMLTextAreaElement>) => {
    switch (event?.target.name) {
      case 'fullName':
        setInputFullName(event.target.value)
        break
      case 'email':
        setInputEmail(event.target.value)
        break
      case 'phone':
        setInputPhone(event.target.value)
        break
      case 'address':
        setInputAddress(event.target.value)
        break
      case 'promo':
        setInputPromo(event.target.value)
        break
      case 'comment':
        setInputComment(event.target.value)
        break
      default:
        break
    }
  }


  return { setInputStorage, inputFullName, inputEmail, inputPhone, inputAddress, inputPromo, inputComment }
}
