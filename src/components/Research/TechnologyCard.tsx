import React from 'react'
import { motion } from 'motion/react'
import { Icon } from '@iconify/react'
import { useNavigate } from 'react-router-dom'
import { TechnologyItem } from '../../data/researchData'

interface TechnologyCardProps {
  item: TechnologyItem
}

const TechnologyCard: React.FC<TechnologyCardProps> = ({ item }) => {
  const navigate = useNavigate()

  return (
    <motion.div
      className="flex flex-col justify-between p-4 transition-all border rounded-lg cursor-pointer bg-slate-800/40 border-slate-700/50 hover:border-slate-600/80 hover:bg-slate-800/70"
      whileHover={{ scale: 1.02, y: -5, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.98 }}
      onClick={() => navigate(item.path)}>
      <div>
        <div className="flex items-center gap-3 mb-3">
          <div
            className="flex items-center justify-center w-10 h-10 rounded-md"
            style={{
              backgroundColor: item.iconBg || '#1E293B', // Дефолтный фон
            }}>
            <Icon
              icon={item.icon}
              className="w-6 h-6"
              style={{ color: item.textColor || 'white' }} // Дефолтный цвет
            />
          </div>
          <h3 className="text-lg font-medium text-white">{item.name}</h3>
        </div>
        <p className="mb-3 text-sm text-gray-300">{item.description}</p>
      </div>
      <div className="flex items-center justify-between mt-1 text-xs text-gray-400">
        <span>Документация</span> {/* Можно сделать динамическим */}
        <Icon icon="ph:arrow-right" className="w-4 h-4" />
      </div>
    </motion.div>
  )
}

export default TechnologyCard
