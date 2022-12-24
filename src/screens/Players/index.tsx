import { useState } from "react";
import { useRoute } from "@react-navigation/native";
import { Alert, FlatList } from "react-native";

import { AppError } from "@utils/AppError";

import { playerAddByGroup } from "@storage/player/playerAddByGroup";
import { playersGetByGroupAndTeam } from "@storage/player/playersGetByGroupAndTeam";
import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO";

import { Button } from "@components/Button";
import { ButtonIcon } from "@components/ButtonIcon";
import { Filter } from "@components/Filter";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { ListEmpty } from "@components/ListEmpty";
import { PlayerCard } from "@components/PlayerCard";

import { Container, Form, ListHeader, NumberOfPlayers } from "./styles";
import { useEffect } from "react";

type RouteParams = {
    group: string;
}

export function Players() {
    const [team, setTeam] = useState('time a');
    const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);
    const [newPlayerName, setNewPlayerName] = useState('');

    const route = useRoute();
    const { group } = route.params as RouteParams;

    async function handleAddPlayer() {
        
        if(newPlayerName.trim().length === 0) {
            return Alert.alert('Nova pessoa','Informe o nome na pessoa para adicionar.');
        }

        const newPlayer = {
            name: newPlayerName,
            team,
        }

        try {
            await playerAddByGroup(newPlayer, group);
            setNewPlayerName('');
            fetchPlayersByTeam();
            
        } catch (error) {
            if (error instanceof AppError) {
                Alert.alert('Nova Pessoa', error.message)
            } else {
            }
        }
    }

    async function fetchPlayersByTeam() {
        try {
            const playersByTeam = await playersGetByGroupAndTeam(group, team);
            setPlayers(playersByTeam);
        } catch (error) {
            Alert.alert('Pessoas', 'Não foi possível carregar as pessoas do time selecionado.');
            console.log(error);
        }
    }

    useEffect(() => {
        fetchPlayersByTeam();
    }, [team])

    return (
        <Container>
            <Header showBackButton />

            <Highlight
                title={group}
                subtitle="adicione a galera e separe em times"
            />
            <Form>
                <Input
                    onChangeText={setNewPlayerName}
                    value={newPlayerName}
                    placeholder="Nome da pessoa"
                    autoCorrect={false}
                />
                <ButtonIcon
                    icon="add"
                    onPress={handleAddPlayer}
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
                keyExtractor={ item => item.name }
                renderItem={({ item }) => (
                    <PlayerCard
                        name={item.name}
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