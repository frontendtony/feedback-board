import { Tab } from '@headlessui/react';
import * as React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { productRequests } from '../../data.json';
import AngleLeft from '../../icons/AngleLeft';
import { RoadmapRequestCard } from '../RequestCard';

export default function Roadmap() {
  const history = useHistory();
  const [selectedTab, setSelectedTab] = React.useState(0);

  const requests = React.useMemo(
    () =>
      productRequests.reduce<{
        Planned: App.Request[];
        'In-Progress': App.Request[];
        Live: App.Request[];
      }>(
        (acc, curr) => ({
          Planned: acc['Planned'].concat(curr.status === 'planned' ? [curr] : []),
          'In-Progress': acc['In-Progress'].concat(curr.status === 'in-progress' ? [curr] : []),
          Live: acc['Live'].concat(curr.status === 'live' ? [curr] : []),
        }),
        { Planned: [], 'In-Progress': [], Live: [] }
      ),
    [productRequests]
  );

  return (
    <main className="page-container">
      <div className="flex items-center justify-between bg-dark text-white px-6 py-5 md:p-8 md:py-7 md:rounded">
        <div>
          <button onClick={history.goBack} className="flex items-center space-x-4 text-white">
            <AngleLeft className="text-xs" />
            <span className="font-bold text-sm">Go Back</span>
          </button>
          <h1 className="font-bold text-lg mt-2">Roadmap</h1>
        </div>

        <Link to="/new" className="btn primary">
          + Add Feedback
        </Link>
      </div>

      <Tab.Group onChange={setSelectedTab}>
        <Tab.List
          className={`border-b border-light grid grid-cols-3 before:h-1 before:bg-primary before:w-1/3 ${
            selectedTab === 1
              ? 'before:translate-x-full'
              : selectedTab === 2
              ? 'before:translate-x-[200%]'
              : ''
          } relative before:absolute before:bottom-0 before:transition-transform`}
        >
          {Object.entries(requests).map(([key, value]) => (
            <Tab as={React.Fragment} key={key}>
              {({ selected }) => (
                <button
                  className={`py-5 w-full flex text-default justify-center text-small font-bold ${
                    selected ? '' : 'text-opacity-40'
                  }`}
                >
                  {key} ({value.length})
                </button>
              )}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="p-6">
          {Object.entries(requests).map(([key, value]) => (
            <Tab.Panel key={'Panel-' + key}>
              <h2 className="text-lg font-bold">
                {key} ({value.length})
              </h2>
              <p className="text-light text-small">
                {key === 'Planned'
                  ? 'Features to be developed'
                  : key === 'In-Progress'
                  ? 'Features currently being developed'
                  : 'Features that have been implemented'}
              </p>
              <ul className="space-y-4 mt-6">
                {value.map((feedback) => (
                  <li key={feedback.id}>
                    <RoadmapRequestCard request={feedback} />
                  </li>
                ))}
              </ul>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </main>
  );
}
