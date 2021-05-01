import React, { useContext } from 'react'
import { Context } from '../Context'
import { Grid, Segment } from 'semantic-ui-react'

import Dummy from './DummyApi'


export default function TopologyInfo() {
    const {
        topologyTemplate,
        plannedTopologyTemplate,
        provisionedToscaTemplate,
        topoBtnClick, 
        planTopoBtn, 
        findProvisioned,
        findDeleted,
        deleted
      } = useContext(Context)

    return (
        <div>
            <Segment>
                <Grid columns="equal">
                    <Grid.Column>
                        <Dummy
                          callApi={topoBtnClick}
                          modalBtnName="My topology template"
                          headerInfo="Your topology template"
                          data={topologyTemplate}
                        />
                    </Grid.Column>
                    <Grid.Column>
                        <Dummy
                          callApi={planTopoBtn}
                          modalBtnName="My planned topology template"
                          headerInfo="Your planned topology template"
                          data={plannedTopologyTemplate}
                        />
                    </Grid.Column>
                    <Grid.Column>
                        <Dummy
                          callApi={findProvisioned}
                          modalBtnName="My provisioned topology template"
                          headerInfo="Your provisioned topology template"
                          data={provisionedToscaTemplate}
                        />
                    </Grid.Column>
                    <Grid.Column>
                        <Dummy
                          callApi={findDeleted}
                          modalBtnName="My deleted provision"
                          headerInfo="Your deleted provision"
                          data={deleted}
                        />
                    </Grid.Column>
                </Grid>
            </Segment>
        </div>
    )
}