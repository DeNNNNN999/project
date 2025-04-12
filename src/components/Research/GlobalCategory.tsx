import React from 'react'
import { Icon } from '@iconify/react'
import TechnologyCard from './TechnologyCard'
import MainCategory from './MainCategory'
import { Category } from '../../data/researchData'

interface GlobalCategoryProps {
  category: Category

  filteredItems?: Category['items']
}

const GlobalCategory: React.FC<GlobalCategoryProps> = ({ category, filteredItems }) => {

  if (category.isMainCategory) {
    return <MainCategory category={category} />
  }


  const itemsToDisplay = filteredItems || category.items

  return (
    <div className="mb-12">
      {/* Заголовок категории */}
      <div className="flex items-start gap-4 mb-6">
        <div
          className="flex items-center justify-center p-3 rounded-md"
          style={{ backgroundColor: `${category.color}20` }}>
          <Icon icon={category.icon} style={{ color: category.color }} className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">{category.name}</h2>
          <p className="text-sm text-gray-400">{category.description}</p>
        </div>
      </div>

      {/* Карточки или заглушка "Coming Soon" */}
      {category.comingSoon ? (
        <div className="p-6 text-center border border-dashed rounded-lg border-slate-600/50 bg-slate-800/20">
          <Icon icon="ph:clock-countdown-bold" className="w-8 h-8 mx-auto mb-3 text-gray-500" />{' '}
          {/* Измененная иконка */}
          <h3 className="mb-2 text-xl font-medium text-gray-300">Задачи в разработке</h3>
          <p className="max-w-lg mx-auto text-sm text-gray-400">
            Скоро здесь появятся интересные задачи для практики и развития навыков. Следите за обновлениями!
          </p>
        </div>
      ) : // Отображаем сетку карточек, если есть элементы для отображения
      itemsToDisplay && itemsToDisplay.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {itemsToDisplay.map(item => (
            <TechnologyCard key={item.id} item={item} />
          ))}
        </div>
      ) : // Можно показать сообщение "Ничего не найдено", если поиск не дал результатов
      !filteredItems && category.items && category.items.length === 0 ? (
        <p className="text-gray-500">В этой категории пока нет технологий.</p>
      ) : null
      // Если filteredItems пуст, но поиск был, сообщение о "не найдено" лучше показывать глобально
      }
    </div>
  )
}

export default GlobalCategory
