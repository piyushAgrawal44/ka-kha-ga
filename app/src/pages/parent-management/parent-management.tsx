import { Plus } from "lucide-react"
import Button from "../../components/ui/button/button"
import Input from "../../components/ui/input/Input"
import PageHeader from "../../components/ui/page-header/page-header"

function ParentManagement() {
  return (
    <>
      <div className='flex justify-between items-center'>
        <div className="mb-6">
          <PageHeader title='Parent Management' description='Manage and track all parent' />
        </div>
        <div className='flex gap-2'>
          <Button icon={Plus}>Invite Parent</Button>
          <Input type='search' placeholder='Search...' />
        </div>

      </div>
    </>
  )
}

export default ParentManagement