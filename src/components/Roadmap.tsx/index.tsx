import { Tab } from '@headlessui/react';
import * as React from 'react';
import { Link, useHistory } from 'react-router-dom';
import useRequests, { RequestReturnType } from 'src/data/useRequests';
import AngleLeft from '../../icons/AngleLeft';
import { RoadmapRequestCard } from '../common/RequestCard';
import Spinner from '../primitives/Spinner';

export default function Roadmap() {
  const history = useHistory();
  const [selectedTab, setSelectedTab] = React.useState(0);
  const { data, loading } = useRequests();

  const requests = React.useMemo(
    () =>
      data?.reduce<{
        Planned: RequestReturnType[];
        'In-Progress': RequestReturnType[];
        Live: RequestReturnType[];
      }>(
        (acc, curr) => ({
          Planned: acc['Planned'].concat(curr.status === 'planned' ? [curr] : []),
          'In-Progress': acc['In-Progress'].concat(curr.status === 'in-progress' ? [curr] : []),
          Live: acc['Live'].concat(curr.status === 'live' ? [curr] : []),
        }),
        { Planned: [], 'In-Progress': [], Live: [] }
      ),
    [data]
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

      {loading ? (
        <Spinner className="text-6xl mx-auto mt-16" />
      ) : (
        <>
          <div className="md:hidden">
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
                {Object.entries(requests ?? {}).map(([key, value]) => (
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
                {Object.entries(requests ?? {}).map(([key, value]) => (
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
          </div>

          <div className="mobile:hidden mt-8 lg:mt-12">
            <KanbanBoard
              planned={requests?.Planned}
              inProgress={requests?.['In-Progress']}
              live={requests?.Live}
            />
          </div>
        </>
      )}
    </main>
  );
}

function KanbanBoard(props: {
  planned?: RequestReturnType[];
  inProgress?: RequestReturnType[];
  live?: RequestReturnType[];
}) {
  return (
    <div className="grid grid-cols-3 gap-4 lg:gap-8">
      <div>
        <h2 className="font-bold">Planned ({props.planned?.length})</h2>
        <p className="text-light text-sm">Ideas prioritized for research</p>
        <ul className="space-y-4 lg:space-y-6 mt-6">
          {props.planned?.map((feedback) => (
            <li key={feedback.id}>
              <RoadmapRequestCard request={feedback} />
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="font-bold">In-Progress ({props.inProgress?.length})</h2>
        <p className="text-light text-sm">Currently being developed</p>
        <ul className="space-y-4 lg:space-y-6 mt-6">
          {props.inProgress?.map((feedback) => (
            <li key={feedback.id}>
              <RoadmapRequestCard request={feedback} />
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="font-bold">Live ({props.live?.length})</h2>
        <p className="text-light text-sm">Released features</p>
        <ul className="space-y-4 lg:space-y-6 mt-6">
          {props.live?.map((feedback) => (
            <li key={feedback.id}>
              <RoadmapRequestCard request={feedback} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
