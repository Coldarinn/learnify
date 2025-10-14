import { PlusOutlined } from "@ant-design/icons"
import { reatomComponent } from "@reatom/react"
import { useState } from "react"

import { Button } from "@/shared/components/Button"

import { CreationModal } from "./CreationModal"
import EmptyIcon from "./images/empty.png"
import { Banner, Courses, Empty, Intro } from "./styles"

export const Dashboard = reatomComponent(() => {
  const [isOpen, setIsOpen] = useState(false)

  const courses = []

  return (
    <>
      <Banner>
        <section className="content">
          <h2>Welcome back, Alex!</h2>
          <p>Manage your courses and continue creating amazing content.</p>
          <Button size="l" onClick={() => setIsOpen(true)}>
            Create a new course
          </Button>
        </section>
      </Banner>

      <Intro>
        {courses.length === 0 ? (
          <Empty>
            <img src={EmptyIcon} alt="No courses" />
            <h2>Look like you haven't created any courses yet</h2>
            <Button size="l" type="extra-outline" onClick={() => setIsOpen(true)} icon={<PlusOutlined />}>
              Create your first course
            </Button>
          </Empty>
        ) : (
          <Courses>
            <section className="header">
              <h2>Your courses</h2>
              <Button onClick={() => setIsOpen(true)}>Create new</Button>
            </section>
            <div className="grid"></div>
          </Courses>
        )}
      </Intro>

      <CreationModal open={isOpen} onCancel={() => setIsOpen(false)} />
    </>
  )
})
