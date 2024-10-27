import { Card, CardHeader, CardTitle } from '@/components/ui/card'

// async function getItems() {
//   const result = await fetch()
// }

export default function Home() {
  return (
    <main>
      <div className="grid grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <div>
              <CardTitle>{/*{item.title}*/}item title</CardTitle>
            </div>
          </CardHeader>
        </Card>
      </div>
    </main>
  );
}
