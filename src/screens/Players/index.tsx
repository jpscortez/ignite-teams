import { Button } from "@components/Button";
import { ButtonIcon } from "@components/ButtonIcon";
import { Filter } from "@components/Filter";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { ListEmpty } from "@components/ListEmpty";
import { PlayerCard } from "@components/PlayerCard";
import { useState } from "react";
import { FlatList } from "react-native";

import { Container, Form, ListHeader, NumberOfPlayers } from "./styles";

export function Players() {
    const [team, setTeam] = useState('time a');
    const [players, setPlayers] = useState(['Ana Carolina', 'Antônio']);

    return (
        <Container>
            <Header showBackButton />

            <Highlight
                title="Nome da Turma"
                subtitle="adicione a galera e separe em times"
            />
            <Form>
                <Input
                    placeholder="Nome da pessoa"
                    autoCorrect={false}
                />
                <ButtonIcon
                    icon="add"
                />
            </Form>

            <ListHeader>

                <FlatList
                    data={['time a', 'time b']}
                    keyExtractor={ item => item }
                    renderItem={({ item }) => (
                        <Filter
                            title={item}
                            isActive={team === item}
                            onPress={() => setTeam(item)}
                        />
                    )}
                    horizontal
                />
                <NumberOfPlayers>
                    {players.length}
                </NumberOfPlayers>
            </ListHeader>

            <FlatList
                data={players}
                keyExtractor={ item => item }
                renderItem={({ item }) => (
                    <PlayerCard
                        name={item}
                        onRemove={() => {}}
                    />
                )}
                ListEmptyComponent={() => (
                    <ListEmpty
                        message="Não há pessoas nesse time."
                    />
                )}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[{paddingBottom: 100}, players.length === 0 && { flex: 1 }]}
            />
            
            <Button title="Remover Turma" type="SECONDARY" />

        </Container>
    );
}