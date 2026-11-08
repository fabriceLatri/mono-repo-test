import { useRef, type ReactNode } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'
import { cn } from '../utils/cn'

type Orientation = 'vertical' | 'horizontal'

type VirtualizedListProps<T extends { id: number }> = {
  items: T[]
  renderItem: (item: T) => ReactNode
  orientation?: Orientation
  className?: string
}

export function VirtualizedList<T extends { id: number }>({
  items,
  renderItem,
  orientation = 'vertical',
  className,
}: VirtualizedListProps<T>) {
  const parentRef = useRef<HTMLDivElement>(null)
  const isHorizontal = orientation === 'horizontal'

  const virtualizer = useVirtualizer({
    horizontal: isHorizontal,
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => (isHorizontal ? 240 : 180),
    overscan: 5,
    getItemKey: (index) => items[index].id,
  })

  return (
    <div
      ref={parentRef}
      className={cn(
        isHorizontal ? 'overflow-x-auto overflow-y-hidden p-4' : 'h-screen overflow-auto p-4',
        className,
      )}
    >
      <div
        className={cn('relative', isHorizontal ? 'h-full' : 'w-full')}
        style={
          isHorizontal
            ? { width: virtualizer.getTotalSize() }
            : { height: virtualizer.getTotalSize() }
        }
      >
        {virtualizer.getVirtualItems().map((item) => (
          <div
            key={item.key}
            data-index={item.index}
            ref={virtualizer.measureElement}
            className={cn('absolute top-0 left-0', isHorizontal ? 'h-full pr-4' : 'w-full pb-4')}
            style={{
              transform: isHorizontal
                ? `translateX(${item.start}px)`
                : `translateY(${item.start}px)`,
            }}
          >
            {renderItem(items[item.index])}
          </div>
        ))}
      </div>
    </div>
  )
}
