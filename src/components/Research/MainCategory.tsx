import React from 'react'
import { motion } from 'motion/react'
import { Icon } from '@iconify/react'
import { useNavigate } from 'react-router-dom'
import { Category } from '../../data/researchData'

interface MainCategoryProps {
  category: Category
}

const MainCategory: React.FC<MainCategoryProps> = ({ category }) => {
  const navigate = useNavigate()

  // Проверяем, есть ли путь для навигации
  const handleNavigation = () => {
    if (category.path) {
      navigate(category.path)
    }
  }

  return (
    <motion.div
      className="mb-12"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onClick={handleNavigation} // Навигация по клику
    >
      <motion.div
        className={`flex items-start gap-4 mb-6 ${category.path ? 'cursor-pointer' : ''}`} // Курсор, если есть path
        whileHover={category.path ? { y: -5, transition: { duration: 0.2 } } : {}}
        whileTap={category.path ? { scale: 0.98 } : {}}>
        <div
          className="flex items-center justify-center p-3 rounded-md"
          style={{ backgroundColor: `${category.color}20` }} // Прозрачность фона
        >
          <Icon icon={category.icon} style={{ color: category.color }} className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">{category.name}</h2>
          <p className="text-sm text-gray-400">{category.description}</p>
        </div>
      </motion.div>
      {/* Здесь можно добавить контент для этих категорий или оставить так */}
    </motion.div>
  )
}

export default MainCategory
