
let eventGuid = 0

export const INITIAL_EVENTS = [
  {
    id: createEventId(),
    title: '',
    start: '',
    end:'',
  },
]

//슬라이드 왼쪽 이벤트에 ++
export function createEventId() {
  return String(eventGuid++)
}

